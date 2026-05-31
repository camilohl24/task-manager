using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskItemsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TaskItemsController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItemResponseDto>>> GetAll()
    {
        var tasks = await _context.TaskItems.ToListAsync();
        return tasks.Select(MapTodo).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItemResponseDto>> GetById(int id)
    {
        var task = await _context.TaskItems.FindAsync(id);
        if (task == null)
            return NotFound();
        return MapTodo(task);
    }
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        var task = await _context.TaskItems.FindAsync(id);
        if (task == null)
            return NotFound();
        if (!Enum.TryParse<TaskItemStatus>(status, true, out var newStatus))
            return BadRequest("Invalid status value.");
        task.Status = newStatus;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<TaskItemResponseDto>> Create(TaskItemRequestDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            AssignedTo = dto.AssignedTo,
            CreatedAt = DateTime.UtcNow,
            DueDate = dto.DueDate
        };
        _context.TaskItems.Add(task);
        await _context.SaveChangesAsync();
        return MapTodo(task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TaskItemRequestDto dto)
    {
        var task = await _context.TaskItems.FindAsync(id);
        if (task == null)
            return NotFound();
        task.Title = dto.Title;
        task.Description = dto.Description;
        task.AssignedTo = dto.AssignedTo;
        task.DueDate = dto.DueDate;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await _context.TaskItems.FindAsync(id);
        if (task == null)
            return NotFound();
        _context.TaskItems.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    private TaskItemResponseDto MapTodo(TaskItem T) => new TaskItemResponseDto
    {
        Id = T.Id,
        Title = T.Title,
        Description = T.Description,
        AssignedTo = T.AssignedTo,
        Status = T.Status,
        CreatedAt = T.CreatedAt,
        DueDate = T.DueDate
    };
}
