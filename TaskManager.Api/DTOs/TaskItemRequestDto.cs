using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.DTOs;

public class TaskItemRequestDto
{
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public string Description { get; set; } = null!;
    public string? AssignedTo { get; set; }
    public DateTime? DueDate { get; set; }
}
